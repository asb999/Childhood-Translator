/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mic, Image as ImageIcon, Smile, ArrowRight, ChevronLeft, Lightbulb, MessageCircle, Heart, Sparkles, Activity, User, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type ViewState = 'home' | 'input' | 'analyzing' | 'result';
type Severity = '轻微' | '中度' | '严重';

export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [inputText, setInputText] = useState('');
  const [severity, setSeverity] = useState<Severity>('中度');
  const [isRecording, setIsRecording] = useState(false);

  const handleTranslate = () => {
    if (!inputText.trim() && !isRecording) return;
    setView('analyzing');
    setTimeout(() => {
      setView('result');
    }, 2000);
  };

  const reset = () => {
    setView('input');
    setInputText('');
    setSeverity('中度');
  };

  const goHome = () => {
    setView('home');
    setInputText('');
    setSeverity('中度');
  };

  return (
    <div className="min-h-screen bg-[#fffcf7] text-[#383835] font-sans selection:bg-[#c9e6fd] selection:text-[#264254] flex flex-col max-w-md mx-auto relative shadow-2xl overflow-hidden">
      {/* Header */}
      <header className="w-full sticky top-0 z-50 bg-[#fffcf7]/90 backdrop-blur-md pt-12 pb-3 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {view === 'result' || view === 'input' ? (
            <button onClick={view === 'result' ? reset : goHome} className="p-1 -ml-1 active:scale-95 transition-transform">
              <ChevronLeft className="w-6 h-6 text-[#4c687b]" />
            </button>
          ) : (
            <Sparkles className="w-6 h-6 text-[#4c687b]" />
          )}
          <h1 className="text-lg font-extrabold tracking-tight text-[#4c687b]">童年翻译器</h1>
        </div>
        {/* Mini Program Capsule */}
        <div className="flex items-center bg-[#eae8e2] rounded-full px-3 py-1.5 gap-2 border border-[#bbb9b4]/20">
          <div className="w-4 h-1 bg-[#82807c] rounded-full"></div>
          <div className="w-px h-4 bg-[#bbb9b4]/50"></div>
          <div className="w-4 h-4 rounded-full border-2 border-[#82807c]"></div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto relative hide-scrollbar pb-24">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <HomeView key="home" onStart={() => setView('input')} />
          )}
          {view === 'input' && (
            <InputView 
              key="input"
              inputText={inputText}
              setInputText={setInputText}
              severity={severity}
              setSeverity={setSeverity}
              isRecording={isRecording}
              setIsRecording={setIsRecording}
              onTranslate={handleTranslate}
            />
          )}
          {view === 'analyzing' && (
            <AnalyzingView key="analyzing" />
          )}
          {view === 'result' && (
            <ResultView key="result" severity={severity} />
          )}
        </AnimatePresence>
      </main>

      {view !== 'analyzing' && (
        <nav className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-[#bbb9b4]/20 pb-safe pt-2 px-6 flex justify-around items-center z-50 rounded-t-[2rem] shadow-[0_-4px_24px_rgba(0,0,0,0.02)] max-w-md mx-auto right-0">
          <div onClick={goHome} className={`flex flex-col items-center justify-center w-16 h-14 cursor-pointer transition-colors relative ${view === 'home' ? 'text-[#4c687b]' : 'text-[#9e9d98] hover:text-[#4c687b]'}`}>
            {view === 'home' && <div className="absolute -top-2 w-8 h-1 bg-[#4c687b] rounded-full"></div>}
            <Home className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-bold">首页</span>
          </div>
          <div onClick={() => setView('input')} className={`flex flex-col items-center justify-center w-16 h-14 cursor-pointer transition-colors relative ${view === 'input' || view === 'result' ? 'text-[#4c687b]' : 'text-[#9e9d98] hover:text-[#4c687b]'}`}>
            {(view === 'input' || view === 'result') && <div className="absolute -top-2 w-8 h-1 bg-[#4c687b] rounded-full"></div>}
            <MessageCircle className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-bold">翻译</span>
          </div>
          <div className="flex flex-col items-center justify-center w-16 h-14 text-[#9e9d98] hover:text-[#4c687b] transition-colors cursor-pointer">
            <Activity className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">记录</span>
          </div>
          <div className="flex flex-col items-center justify-center w-16 h-14 text-[#9e9d98] hover:text-[#4c687b] transition-colors cursor-pointer">
            <User className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">我的</span>
          </div>
        </nav>
      )}
    </div>
  );
}

function HomeView({ onStart }: { onStart: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="px-5 pt-2 pb-8 space-y-8"
    >
      <section className="mb-6">
        <h2 className="text-2xl font-extrabold text-[#383835] tracking-tight">早上好，<br/><span className="text-[#4c687b]">今天孩子心情如何？</span></h2>
      </section>

      <section className="mb-8">
        <div onClick={onStart} className="block relative rounded-[2rem] overflow-hidden shadow-xl active:scale-[0.98] transition-transform duration-300 group cursor-pointer">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHhFrFOhG4s5VfbCZKqb1R9V879nho5qa3k7POZZGRhN6tL3SsAzpFx2WGnQYBvGvY3UyzDzTuD8ZXR4MQ2XjDbt887h2U7A0Bci5hkH2ZY9wY84a2rRQWDZvk1zaqhPAm4hoDSQRFR_uvxaofqDr8xvhkYVXaW9pcQYN5Zer5drTCZ7DR29ZwzuMtHGJ3K4GjyhvPwjiwTeqjEPKCYQkvqddyxWA1B23UW7EwQBhPUG2i1hd0L73qF3jue9lew6S3vAZr21ICI6Y" 
               alt="Parent comforting child" 
               className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#694a8b]/90 via-[#694a8b]/40 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col items-start">
            <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/30 mb-4 flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-white text-xs font-bold tracking-wider">AI 情绪解析</span>
            </div>
            
            <h3 className="text-3xl font-extrabold text-white mb-2 leading-tight drop-shadow-md">
              听懂孩子<br/>无声的求助
            </h3>
            <p className="text-white/90 text-sm mb-6 font-medium">
              输入孩子的行为或话语，发现背后的真实需求。
            </p>
            
            <div className="w-full bg-white/95 backdrop-blur-sm text-[#694a8b] py-4 rounded-full font-bold text-base flex items-center justify-center gap-2 shadow-lg group-hover:bg-white transition-colors">
              <span>开始翻译</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#383835]">快捷记录</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={onStart} className="bg-[#fcf9f4] p-5 rounded-2xl flex flex-col items-start gap-3 border border-[#bbb9b4]/10 active:scale-95 transition-transform text-left">
            <div className="w-10 h-10 rounded-full bg-[#f95630]/20 flex items-center justify-center">
              <span className="text-xl">😭</span>
            </div>
            <div>
              <div className="font-bold text-[#383835] text-sm">突然哭闹</div>
              <div className="text-xs text-[#656461] mt-0.5">一键记录情绪崩溃</div>
            </div>
          </button>
          
          <button onClick={onStart} className="bg-[#fcf9f4] p-5 rounded-2xl flex flex-col items-start gap-3 border border-[#bbb9b4]/10 active:scale-95 transition-transform text-left">
            <div className="w-10 h-10 rounded-full bg-[#dce8b2]/50 flex items-center justify-center">
              <span className="text-xl">🙅</span>
            </div>
            <div>
              <div className="font-bold text-[#383835] text-sm">拒绝配合</div>
              <div className="text-xs text-[#656461] mt-0.5">不想吃饭/睡觉/出门</div>
            </div>
          </button>
        </div>
      </section>
    </motion.div>
  );
}

function InputView({ inputText, setInputText, severity, setSeverity, isRecording, setIsRecording, onTranslate }: any) {

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="px-6 pt-4 pb-8 space-y-8"
    >
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-[#383835]">告诉我发生了什么？</h2>
        </div>
        
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#c9e6fd] to-[#d6b2fc] rounded-2xl blur opacity-20 transition duration-500"></div>
          <div className="relative bg-white rounded-2xl p-5 shadow-sm ring-1 ring-[#bbb9b4]/20 focus-within:ring-[#4c687b]/40 transition-all duration-300">
            <textarea 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full bg-transparent border-none focus:ring-0 text-[#383835] placeholder:text-[#bbb9b4] text-lg leading-relaxed min-h-[160px] resize-none outline-none" 
              placeholder="例如：孩子一直玩手机不写作业，说了好几次都不听，还对我发火..."
            />
            <div className="flex justify-between items-center mt-2 border-t border-[#f0eee8] pt-3">
              <div className="flex gap-3">
                <button className="text-[#9e9d98] hover:text-[#4c687b] transition-colors">
                  <ImageIcon className="w-5 h-5" />
                </button>
                <button className="text-[#9e9d98] hover:text-[#4c687b] transition-colors">
                  <Smile className="w-5 h-5" />
                </button>
              </div>
              <div className="text-xs text-[#9e9d98] font-medium">{inputText.length}/500</div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center space-y-4 py-2">
        <div className="relative">
          {isRecording && (
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute inset-0 bg-[#4c687b] rounded-full"
            />
          )}
          <button 
            onPointerDown={() => setIsRecording(true)}
            onPointerUp={() => setIsRecording(false)}
            onPointerLeave={() => setIsRecording(false)}
            className={`relative w-20 h-20 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${isRecording ? 'bg-[#395567] scale-95' : 'bg-[#4c687b] hover:bg-[#435f71]'}`}
          >
            <Mic className="w-8 h-8 text-white" />
          </button>
        </div>
        <p className="text-sm font-semibold text-[#4c687b]/80 tracking-wide">
          {isRecording ? '松开结束录音' : '按住语音录入'}
        </p>
      </section>

      <section className="bg-[#fcf9f4] rounded-2xl p-6 space-y-6 border border-[#bbb9b4]/10">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#5e693e]" />
          <h3 className="font-bold text-[#383835]">当前冲突程度</h3>
        </div>
        
        <SeverityScale value={severity} onChange={setSeverity} />
        
        <p className="text-xs text-[#656461] leading-relaxed text-center italic">
          “准确评估冲突程度，有助于生成更贴合的沟通建议”
        </p>
      </section>

      <div className="pt-4">
        <button 
          onClick={onTranslate}
          disabled={!inputText.trim() && !isRecording}
          className="w-full bg-[#4c687b] disabled:bg-[#bbb9b4] text-white py-4 rounded-full font-bold text-lg shadow-xl shadow-[#4c687b]/20 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
        >
          <span>开始翻译</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}

function SeverityScale({ value, onChange }: { value: Severity, onChange: (v: Severity) => void }) {
  const levels: Severity[] = ['轻微', '中度', '严重'];
  const currentIndex = levels.indexOf(value);
  
  return (
    <div className="space-y-8 px-2">
      <div className="relative h-2 w-full bg-[#eae8e2] rounded-full flex items-center">
        <div className={`absolute h-full left-0 rounded-l-full transition-all duration-300 ${currentIndex >= 0 ? 'w-1/3 bg-[#5e693e]' : 'w-0'}`}></div>
        <div className={`absolute h-full left-1/3 transition-all duration-300 ${currentIndex >= 1 ? 'w-1/3 bg-[#c8a5ed]' : 'w-0'}`}></div>
        <div className={`absolute h-full left-2/3 rounded-r-full transition-all duration-300 ${currentIndex >= 2 ? 'w-1/3 bg-[#f95630]' : 'w-0'}`}></div>
        
        <div 
          className="absolute w-6 h-6 bg-white border-4 rounded-full shadow-md z-10 transition-all duration-300"
          style={{ 
            left: currentIndex === 0 ? '16.66%' : currentIndex === 1 ? '50%' : '83.33%',
            transform: 'translateX(-50%)',
            borderColor: currentIndex === 0 ? '#5e693e' : currentIndex === 1 ? '#c8a5ed' : '#f95630'
          }}
        ></div>
      </div>
      <div className="flex justify-between text-xs font-bold tracking-tighter">
        {levels.map((level, idx) => (
          <div 
            key={level} 
            className="flex flex-col items-center gap-1 cursor-pointer"
            onClick={() => onChange(level)}
          >
            <span className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-[#5e693e]' : idx === 1 ? 'bg-[#c8a5ed]' : 'bg-[#f95630]'} ${currentIndex >= idx ? 'opacity-100' : 'opacity-30'}`}></span>
            <span className={`${currentIndex === idx ? (idx === 0 ? 'text-[#5e693e]' : idx === 1 ? 'text-[#694a8b]' : 'text-[#be2d06]') : 'text-[#9e9d98]'}`}>{level}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyzingView() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-[60vh] space-y-6"
    >
      <div className="relative">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-20 h-20 rounded-full border-4 border-[#c9e6fd] border-t-[#4c687b]"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-[#4c687b] animate-pulse" />
        </div>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold text-[#383835]">正在翻译情绪密码...</h3>
        <p className="text-[#656461] text-sm">AI 正在深度解析行为背后的需求</p>
      </div>
    </motion.div>
  );
}

function ResultView({ severity }: { severity: Severity }) {
  // Mock data based on severity
  const getSuggestions = () => {
    if (severity === '轻微') {
      return [
        { title: '建议：轻松的提醒', content: '“宝贝，作业在等你哦，写完我们就可以去玩了。”', icon: MessageCircle, color: 'text-[#4c687b]', bg: 'bg-[#c9e6fd]' },
        { title: '建议：提供小奖励', content: '“先完成数学，我给你切点水果吃。”', icon: Sparkles, color: 'text-[#5e693e]', bg: 'bg-[#dce8b2]' }
      ];
    } else if (severity === '中度') {
      return [
        { title: '建议：共同商定休息时间', content: '“宝贝，我看你现在有点累了。我们先休息10分钟，你想听个故事还是喝口水？”', icon: MessageCircle, color: 'text-[#4c687b]', bg: 'bg-[#c9e6fd]' },
        { title: '建议：确认并共情 TA 的感受', content: '“我知道现在停下来很难，你刚才真的很努力在拼图了，对不对？”', icon: Heart, color: 'text-[#5e693e]', bg: 'bg-[#dce8b2]' },
        { title: '建议：提供有限的选择权', content: '“我们可以先把玩具放进篮子，或者先去洗手，你选哪一个？”', icon: Sparkles, color: 'text-[#765699]', bg: 'bg-[#d6b2fc]' }
      ];
    } else {
      return [
        { title: '建议：先处理情绪，再处理事情', content: '“你看上去很生气/难过，妈妈陪你坐一会儿，等你感觉好些了我们再说。”', icon: Heart, color: 'text-[#be2d06]', bg: 'bg-[#f95630]/20' },
        { title: '建议：身体接触安抚', content: '（轻轻拍背或拥抱）“没关系，觉得难受就哭出来，妈妈在这里。”', icon: Smile, color: 'text-[#765699]', bg: 'bg-[#d6b2fc]' }
      ];
    }
  };

  const suggestions = getSuggestions();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="px-6 pt-4 pb-12 space-y-8"
    >
      {/* Emotion Labels */}
      <section className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <div className="bg-[#c9e6fd]/50 px-5 py-2.5 rounded-full flex items-center gap-2">
            <span className="text-xl">😫</span>
            <span className="font-bold text-[#395567] text-base">焦虑</span>
          </div>
          <div className="bg-[#d6b2fc]/40 px-5 py-2.5 rounded-full flex items-center gap-2">
            <span className="text-xl">😤</span>
            <span className="font-bold text-[#4c2e6d] text-base">抵触</span>
          </div>
          <div className="bg-[#dce8b2]/60 px-5 py-2.5 rounded-full flex items-center gap-2">
            <span className="text-xl">🥺</span>
            <span className="font-bold text-[#4c562d] text-base">渴望关注</span>
          </div>
        </div>
        <p className="text-[#656461] text-base leading-relaxed px-1">
          基于孩子刚才的表现，TA 似乎正处于情绪的临界点。这种“不听话”其实是一种无声的求助信号。
        </p>
      </section>

      {/* Insight Prism */}
      <section>
        <div className="relative overflow-hidden rounded-3xl p-8 bg-[#d6b2fc] shadow-lg">
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/30 rounded-full blur-3xl"></div>
          <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-[#c8a5ed]/50 rounded-full blur-2xl"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center space-y-4">
            <div className="w-14 h-14 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center mb-1">
              <Lightbulb className="w-7 h-7 text-[#4c2e6d]" />
            </div>
            <h2 className="text-xl font-extrabold tracking-tight text-[#4c2e6d]">核心需求提示</h2>
            <p className="text-2xl font-bold text-[#4c2e6d] leading-snug">
              “孩子可能需要休息或陪伴”
            </p>
            <div className="pt-2">
              <span className="inline-block h-1 w-12 bg-[#4c2e6d]/20 rounded-full"></span>
            </div>
          </div>
        </div>
      </section>

      {/* Suggestions */}
      <section className="space-y-5">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xl font-bold text-[#383835]">沟通建议</h3>
          <span className="text-sm font-semibold text-[#4c687b]">基于{severity}程度优化</span>
        </div>
        
        <div className="space-y-4">
          {suggestions.map((s, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="bg-white p-6 rounded-2xl border border-[#bbb9b4]/20 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full ${s.bg} flex items-center justify-center shrink-0`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <div className="space-y-3 flex-1">
                  <h4 className="font-bold text-[#383835] leading-tight">{s.title}</h4>
                  <div className="bg-[#fcf9f4] p-4 rounded-xl italic text-[#656461] text-base leading-relaxed border border-[#bbb9b4]/10">
                    {s.content}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
