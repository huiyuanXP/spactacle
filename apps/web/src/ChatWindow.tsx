import React,{useEffect,useRef,useState} from 'react';
import {AssistantRuntimeProvider,useExternalStoreRuntime,ThreadPrimitive,MessagePrimitive,ComposerPrimitive,type ThreadMessageLike} from '@assistant-ui/react';
import type {ProjectData,ChatMessage} from '../../../packages/contracts/index.js';
import type {IntakeQuestion} from '../../../packages/contracts/intake.js';
import type {Commit} from './RequirementsPanel.js';
import {api} from './api.js';
import {IntakeCard} from './IntakeCard.js';
import {ComposerMedia} from './ComposerMedia.js';
import './question-card.css';
import './intake-v2.css';
import './question-deck.css';
function UserMessage(){return <MessagePrimitive.Root className="chat-message user"><span className="message-role">你</span><MessagePrimitive.Parts/></MessagePrimitive.Root>;}
function AssistantMessage(){return <MessagePrimitive.Root className="chat-message assistant"><span className="message-role">ROOMNOTE · 咨询助手</span><MessagePrimitive.Parts/></MessagePrimitive.Root>;}
export function ChatWindow({project,roomId,visible,onClose,onSend,onCancel,keyboard,toolStatus,onError,commit,onQuestionnaire,onDelivery}:{project:ProjectData;roomId:string;visible:boolean;onClose:()=>void;onSend:(text:string,room:string,attachments?:string[])=>Promise<void>;onCancel:(runId:string)=>Promise<void>;keyboard:(v:boolean)=>void;toolStatus:string;onError:(text:string)=>void;commit:Commit;onQuestionnaire:()=>void;onDelivery:()=>void}){
 const messages=project.messages.filter(m=>m.room_id===roomId),running=messages.find(m=>m.status==='running'),room=project.rooms.find(r=>r.id===roomId)!;
 const [questions,setQuestions]=useState<IntakeQuestion[]>([]),[selected,setSelected]=useState<string[]>([]),[mediaWorking,setMediaWorking]=useState(false),[questionError,setQuestionError]=useState(''),[expanded,setExpanded]=useState(false);
 const dirty=useRef(new Set<string>()),sendBusy=useRef(false),input=useRef<HTMLTextAreaElement>(null),selection=useRef(selected);selection.current=selected;
 const chooseFiles=(ids:string[])=>{selection.current=ids;setSelected(ids);};
 const runtime=useExternalStoreRuntime<ChatMessage>({messages,isRunning:!!running,
  convertMessage:(m):ThreadMessageLike=>({id:m.id,role:m.role,createdAt:new Date(m.created_at),content:[{type:'text',text:(m.content||'正在读取已有需求…')+(m.attachment_ids?.length?'\n\n本轮参考：'+m.attachment_ids.map(id=>project.attachments?.find(a=>a.id===id)?.name??(project.attachments?.find(a=>a.id===id)?.mime==='image/png'?'参考图片':'语音或资料附件')).join('、'):'')}],...(m.role==='assistant'?{status:m.status==='running'?{type:'running'}:{type:'complete',reason:'stop'}}:{})}),
  onNew:async message=>{
    const text=message.content.filter(c=>c.type==='text').map(c=>c.type==='text'?c.text:'').join('\n'),attachmentIds=[...selection.current];
    if(sendBusy.current||mediaWorking||running){runtime.thread.composer.setText(text);throw Error('请先完成本轮回复或附件处理；你的输入已保留。');}
    sendBusy.current=true;
    try{await onSend(text,roomId,attachmentIds);chooseFiles(selection.current.filter(id=>!attachmentIds.includes(id)));}
    catch(e){runtime.thread.composer.setText(text);onError((e as Error).message);throw e;}
    finally{sendBusy.current=false;}
  },
  onCancel:async()=>{if(running)await onCancel(running.run_id);}
 });
 const refreshQuestions=()=>{let active=true;void api<{next:IntakeQuestion[]}>(`/api/projects/${project.id}/intake?room_id=${roomId}`).then(r=>{if(active){setQuestions(previous=>[...previous.filter(q=>dirty.current.has(q.id)),...r.next.filter(q=>!dirty.current.has(q.id))].slice(0,2));setQuestionError('');}}).catch(e=>{if(active)setQuestionError((e as Error).message);});return()=>{active=false;};};
 useEffect(refreshQuestions,[project.id,project.version,roomId]);
 const renderQuestion=(q:IntakeQuestion)=><IntakeCard key={q.id} question={q} project={project} roomId={roomId} answer={project.intake_answers?.find(a=>a.question_id===q.questionnaire_id&&a.room_id===q.room_id)} commit={commit} keyboard={keyboard} onDirty={(id,value)=>{if(value)dirty.current.add(id);else dirty.current.delete(id);}} onDone={()=>{dirty.current.delete(q.id);setQuestions(previous=>previous.filter(x=>x.id!==q.id));}}/>;
 const send=()=>{if(running||mediaWorking||sendBusy.current)return;const text=runtime.thread.composer.getState().text.trim();if(!text&&selection.current.length)runtime.thread.composer.setText('请结合本轮引用的参考资料，帮我整理与当前房间有关的需求；不确定的内容请作为候选供我确认。');if(text||selection.current.length)runtime.thread.composer.send();else input.current?.focus();};
 return <section className={`chat-window chat-v2${expanded?' chat-expanded':''}`} hidden={!visible} aria-label={`${room.name}咨询聊天`}><AssistantRuntimeProvider runtime={runtime}>
 <div className="chat-header"><div className="assistant-avatar">✳</div><div><strong>和空间顾问聊聊</strong><small>当前聚焦 · {room.name} · 全屋需求共享</small></div><button type="button" className="chat-expand" aria-label={expanded?'缩小聊天':'展开聊天'} onClick={()=>setExpanded(v=>!v)}>{expanded?'↙':'↗'}</button><button type="button" className="icon-button" aria-label="收起聊天" onClick={()=>{keyboard(false);onClose();}}>−</button></div>
 <div className="chat-shortcuts"><button type="button" onClick={onQuestionnaire}>完整问卷 · 60题</button><button type="button" onClick={onDelivery}>交付清单</button><small>一次只确认关键选择</small></div>
 <ThreadPrimitive.Root className="chat-thread"><ThreadPrimitive.Viewport className="chat-viewport"><ThreadPrimitive.Empty><div className="chat-welcome"><span className="eyebrow">A HOME THAT FEELS LIKE YOU</span><h3>先聊生活，再做选择。</h3><p>说说期待、顾虑，或添加照片、户型资料。我会结合已知信息推荐一个方向，再提供其他选择；决定仍由你来做。</p><small>语音先转写为可编辑文字。图片、文档及模型推断不会自动成为已确认需求。</small></div></ThreadPrimitive.Empty><ThreadPrimitive.Messages components={{UserMessage,AssistantMessage}}/>
 </ThreadPrimitive.Viewport>
 <div className="question-cards question-deck" aria-label="当前关键选择">{questions.map((q,index)=><details key={q.id} className="question-fold" open={q.generation==='agent'&&index===0}><summary><strong>{q.questionnaire_id} · {q.text}</strong><span>{index===0?`A · ${q.recommendation.label}`:'另一个可稍后处理的问题'} · 展开选择或自由填写</span></summary>{renderQuestion(q)}</details>)}{questionError&&<p role="status">追问加载未完成，聊天和完整问卷仍可使用。<button type="button" onClick={()=>refreshQuestions()}>重试追问</button></p>}</div>
 {running&&<div className="chat-tool-status" role="status"><span>{toolStatus||'正在结合资料整理建议…'}</span><button type="button" onClick={()=>void onCancel(running.run_id)}>停止本轮</button></div>}
 <ComposerPrimitive.Root className="chat-composer" onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey&&(mediaWorking||running)){e.preventDefault();e.stopPropagation();}}}>
 <ComposerMedia project={project} roomId={roomId} visible={visible} commit={commit} selected={selected} onSelection={chooseFiles} keyboard={keyboard} onWorking={setMediaWorking} onDictation={(text,id)=>{chooseFiles([...new Set([...selection.current,id])]);const old=runtime.thread.composer.getState().text;runtime.thread.composer.setText(old?`${old}\n${text}`:text);input.current?.focus();}} sendButton={<button type="button" className="primary composer-send" aria-label="发送咨询消息" disabled={!!running||mediaWorking} onClick={send}>发送 ↑</button>}>
 <ComposerPrimitive.Input ref={input} aria-label="咨询消息" placeholder={`描述${room.name}的想法，或添加参考资料…`} rows={2} onFocus={()=>keyboard(true)} onBlur={()=>keyboard(false)}/>
 </ComposerMedia></ComposerPrimitive.Root></ThreadPrimitive.Root></AssistantRuntimeProvider></section>;
}
