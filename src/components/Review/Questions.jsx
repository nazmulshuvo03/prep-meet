import { useEffect, useState } from "react";
import { Answers } from "./Answers";

export const Questions = ({
  questions,
  answers = [],
  selections = null,
  setSelections = () => {},
}) => {
  const qnSpan = 12 - answers.length;

  // useEffect(() => {
  //   if (questions && questions.length) {
  //     setSelections(Array.from({ length: questions.length }, () => 0));
  //   }
  // }, questions);

  return (
    <div className="py-4">
      <div className="grid grid-cols-12 py-1">
        <div className={`col-span-${qnSpan}`} />
        {answers && answers.length ? (
          <>
            {answers.map((answer) => (
              <div
                key={answer.id}
                className="col-span-1 items-center justify-self-center text-xs text-gray-400"
              >
                {answer.name}
              </div>
            ))}
          </>
        ) : (
          <div />
        )}
      </div>
      <div>
        {questions && questions.length && selections && selections.length ? (
          <>
            {questions.map((question, i) => {
              return (
                <div className="grid grid-cols-12 py-1" key={question.id}>
                  <div className={`col-span-${qnSpan}`}>{question.text}</div>
                  <Answers
                    color="blue"
                    count={answers.length}
                    value={selections[i]}
                    setValue={(ans) =>
                      setSelections((prev) => {
                        const newArray = [...prev];
                        newArray[i] = ans;
                        return newArray;
                      })
                    }
                  />
                </div>
              );
            })}
          </>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};
