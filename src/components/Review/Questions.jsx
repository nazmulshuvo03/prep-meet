import { Answers } from "./Answers";

export const Questions = ({ questions, answers = [] }) => {
  return (
    <div className="py-4">
      <div className="grid grid-cols-12 py-1">
        <div className={`col-span-${12 - answers.length}`} />
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
        {questions && questions.length ? (
          <>
            {questions.map((question) => {
              return (
                <div className="grid grid-cols-12 py-1" key={question.id}>
                  <div className={`col-span-${12 - answers.length}`}>
                    {question.text}
                  </div>
                  <Answers color="blue" count={answers.length} />
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
