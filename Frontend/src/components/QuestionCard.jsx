import { useState } from 'react';

const QuestionCard = ({
  question,
  index,
  delay = 0,
  selectedAnswer,
  onAnswer,
}) => {



  const handleOptionClick = (option) => {

    if (selectedAnswer) return;
  
    onAnswer(option);
  };

  // Prevent crash if question is undefined
  if (!question) {
    return null;
  }

  return (
    <section
      className="bg-plum/80 border border-white/10 rounded-2xl p-0 overflow-hidden shadow-2xl backdrop-blur-xl animate-fadeUp scrollbar-thin ring-0"
      style={{ animationDelay: `${delay}s` }}
    >

      {/* Header */}
      <div className="code-window">

        <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-white/5 rounded-t-2xl">

          <span className="h-2.5 w-2.5 rounded-full bg-red-400"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-green-400"></span>

        </div>


      </div>
      
      <div className="px-5 pt-5 pb-3 flex items-start justify-between gap-3">
        

        <div>

          <p className="text-xs font-mono text-[#6C63FF]">
            Question {index}
          </p>

          <h2 className="mt-1 text-base font-semibold text-white leading-relaxed">
            {question.question}
          </h2>

        </div>

      </div>

      {/* Code Window */}
      

        <pre className="p-4 overflow-x-auto text-[12px] leading-6 font-mono text-slate-200 scrollbar-thin">

          <code>
            {question.code || "AI Generated Question"}
          </code>

        </pre>

      {/* Options */}
      <div className="px-4 pt-4 pb-5">

        <p className="text-xs uppercase tracking-[0.18em] text-[#A1A1AA] mb-3">
          Choose one answer
        </p>

        <div className="grid gap-2">

          {question.options?.map((option, idx) => (

            <button
              key={idx}
              onClick={() => handleOptionClick(option)}
              className={`w-full rounded-2xl border px-5 py-4 text-left transition-all duration-200
                  ${selectedAnswer === option
                  ? option === question.answer
                    ? 'border-green-500 bg-green-500/10 text-green-300 shadow-lg'
                    : 'border-red-500 bg-red-500/10 text-red-300'
                  : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                }`}
            >

              <span className="font-semibold mr-2">
                {String.fromCharCode(65 + idx)}.
              </span>

              {option}

            </button>

          ))}

        </div>

      </div>

    </section>
  );
};

export default QuestionCard;