import { useEffect, useRef, useState } from "react";
import { Bot, X, Send, Sparkles, Loader2 } from "lucide-react";
import api from "../../api";

// ==========================================
// Comprehensive Fallback Knowledge Engine
// ==========================================
const getFallbackAnswer = (query) => {
  const q = query.toLowerCase();

  if (q.includes("resume") || q.includes("cv")) {
    return "To optimize your resume for ATS, ensure you use clean formatting (avoid tables/graphics), use strong action verbs (e.g., 'Engineered', 'Optimized'), and align your core skills directly with keywords from the job description.";
  }

  if (q.includes("interview") || q.includes("prepare")) {
    return "For interview preparation, use the STAR method (Situation, Task, Action, Result) for behavioral questions. Be ready to explain your top projects in-depth and highlight measurable outcomes.";
  }

  if (q.includes("ats") || q.includes("score")) {
    return "An ATS (Applicant Tracking System) scans resumes for relevant keywords, experience, and education. Aim for an ATS match score above 75% by mirroring exact terminology from the target job posting.";
  }

  if (q.includes("skill") || q.includes("gap")) {
    return "Identifying skill gaps helps you focus on high-impact learning. Compare your existing tech stack against targeted job specs, then prioritize acquiring top missing hard skills first.";
  }

  if (q.includes("salary") || q.includes("negotiat")) {
    return "When negotiating salary, research market averages on sites like Glassdoor or LinkedIn Salaries. State your target range based on your specific achievements, skills, and project impacts.";
  }

  if (
    q.includes("course") ||
    q.includes("learn") ||
    q.includes("roadmap")
  ) {
    return "Build your learning path around practical hands-on projects rather than just watching tutorials. Showcase completed projects with live links and GitHub repos to prove capability.";
  }

  if (
    q.includes("career") ||
    q.includes("job") ||
    q.includes("role")
  ) {
    return "To choose or switch your career path, map your strengths to high-growth roles in the market (e.g., AI/ML, Full Stack Development, Data Engineering) and bridge any skill gap using targeted projects.";
  }

  if (
    q.includes("hi") ||
    q.includes("hello") ||
    q.includes("hey")
  ) {
    return "Hello! I am your HirePulse Assistant. Ask me anything about career strategies, ATS resume building, skills analysis, or interview prep!";
  }

  return "I'm specialized in career guidance, ATS analysis, skill gaps, and interview prep. Could you please specify your question related to resumes, jobs, or skills?";
};

function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Hi! I'm your HirePulse assistant. I can help you with careers, resumes, skills, interviews, and learning paths.",
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // ==========================================
  // Auto Scroll
  // ==========================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  // ==========================================
  // Send Message
  // ==========================================

  const handleSend = async (e) => {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      type: "user",
      text: trimmedMessage,
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
    ]);

    setMessage("");
    setIsLoading(true);

    try {
      const response = await api.post("/chat/", {
        message: trimmedMessage,
      });

      const data = response.data;

      const botMessageText =
        data.response || getFallbackAnswer(trimmedMessage);

      const botMessage = {
        id: Date.now() + 1,
        type: "bot",
        text: botMessageText,
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        botMessage,
      ]);
    } catch (error) {
      console.error(
        "Chatbot API Error, utilizing smart fallback engine:",
        error
      );

      // Smart Fallback Handling so bot always responds seamlessly
      const fallbackText = getFallbackAnswer(trimmedMessage);

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: Date.now() + 1,
          type: "bot",
          text: fallbackText,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* ==========================================
          Chat Window
      ========================================== */}

      {isOpen && (
        <div className="fixed bottom-24 right-5 sm:right-7 z-[9999] w-[calc(100vw-2rem)] sm:w-[390px] h-[540px] max-h-[72vh] bg-[#0F172A]/95 border border-[#FC6C26]/40 rounded-3xl shadow-2xl shadow-[#FC6C26]/10 backdrop-blur-2xl overflow-hidden flex flex-col">

          {/* Top Glow in Burnt Orange */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FC6C26] to-transparent" />

          {/* Header */}
          <div className="px-5 py-4 border-b border-[#FC6C26]/20 bg-[#1E293B]/90">
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-[#FC6C26]/10 border border-[#FC6C26]/30 flex items-center justify-center">
                  <Bot
                    size={21}
                    className="text-[#FC6C26]"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">

                    <h3 className="text-sm font-bold text-[#FFF4D6]">
                      HirePulse Assistant
                    </h3>

                    <Sparkles
                      size={13}
                      className="text-[#FC6C26]"
                    />

                  </div>

                  <div className="flex items-center gap-1.5 mt-0.5">

                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />

                    <span className="text-[11px] text-[#FFF4D6]/70">
                      Online
                    </span>

                  </div>
                </div>

              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#FFF4D6]/70 hover:text-[#FFF4D6] hover:bg-[#FC6C26]/20 transition"
                aria-label="Close chatbot"
              >
                <X size={18} />
              </button>

            </div>
          </div>

          {/* ==========================================
              Messages
          ========================================== */}

          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#0F172A]/50">

            {messages.map((chatMessage) => {
              const isUser = chatMessage.type === "user";

              return (
                <div
                  key={chatMessage.id}
                  className={`flex items-start gap-3 ${
                    isUser
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  {!isUser && (
                    <div className="w-8 h-8 rounded-lg bg-[#FC6C26]/10 border border-[#FC6C26]/30 flex items-center justify-center flex-shrink-0">
                      <Bot
                        size={16}
                        className="text-[#FC6C26]"
                      />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] ${
                      isUser
                        ? "items-end"
                        : "items-start"
                    }`}
                  >

                    <div
                      className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        isUser
                          ? "bg-[#FC6C26] text-[#FFF4D6] font-medium rounded-tr-md shadow-md shadow-[#FC6C26]/20"
                          : "bg-[#1E293B] border border-[#FC6C26]/20 text-[#FFF4D6] rounded-tl-md shadow-sm"
                      }`}
                    >
                      {chatMessage.text}
                    </div>

                    <span
                      className={`block text-[10px] text-[#FFF4D6]/50 mt-1.5 ${
                        isUser
                          ? "text-right mr-1"
                          : "ml-1"
                      }`}
                    >
                      {isUser ? "You" : "HirePulse"}
                    </span>

                  </div>

                </div>
              );
            })}

            {/* Loading */}
            {isLoading && (
              <div className="flex items-start gap-3">

                <div className="w-8 h-8 rounded-lg bg-[#FC6C26]/10 border border-[#FC6C26]/30 flex items-center justify-center flex-shrink-0">
                  <Bot
                    size={16}
                    className="text-[#FC6C26]"
                  />
                </div>

                <div className="bg-[#1E293B] border border-[#FC6C26]/20 rounded-2xl rounded-tl-md px-4 py-3">

                  <div className="flex items-center gap-2">

                    <Loader2
                      size={15}
                      className="text-[#FC6C26] animate-spin"
                    />

                    <span className="text-xs text-[#FFF4D6]/60">
                      Thinking...
                    </span>

                  </div>

                </div>

              </div>
            )}

            <div ref={messagesEndRef} />

          </div>

          {/* ==========================================
              Input
          ========================================== */}

          <div className="p-4 border-t border-[#FC6C26]/20 bg-[#1E293B]/90">

            <form
              onSubmit={handleSend}
              className="flex items-center gap-2"
            >

              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask HirePulse..."
                disabled={isLoading}
                className="flex-1 min-w-0 bg-[#0F172A] border border-[#FC6C26]/30 rounded-xl px-4 py-3 text-sm text-[#FFF4D6] placeholder:text-[#FFF4D6]/40 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-[#FC6C26]/20 transition disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={!message.trim() || isLoading}
                className="w-11 h-11 rounded-xl bg-[#FC6C26] hover:bg-[#FC6C26]/90 text-[#FFF4D6] flex items-center justify-center transition-all shadow-lg shadow-[#FC6C26]/30 flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                ) : (
                  <Send size={17} />
                )}
              </button>

            </form>

            <p className="text-[10px] text-[#FFF4D6]/40 text-center mt-2">
              HirePulse Career Assistant
            </p>

          </div>

        </div>
      )}

      {/* ==========================================
          Floating Button
      ========================================== */}

      <button
        onClick={() => setIsOpen((previous) => !previous)}
        className={`fixed bottom-5 right-5 sm:right-7 z-[10000] w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? "bg-[#1E293B] border border-[#FC6C26]/40 text-[#FFF4D6]"
            : "bg-[#FC6C26] hover:bg-[#FC6C26]/90 text-[#FFF4D6] shadow-xl shadow-[#FC6C26]/40 hover:scale-105"
        }`}
        aria-label={
          isOpen
            ? "Close chatbot"
            : "Open chatbot"
        }
      >

        {isOpen ? (
          <X size={22} />
        ) : (
          <Bot size={23} />
        )}

        {!isOpen && (
          <span className="absolute inset-0 rounded-2xl border border-[#FC6C26]/50 animate-ping pointer-events-none" />
        )}

      </button>
    </>
  );
}

export default FloatingChatbot;