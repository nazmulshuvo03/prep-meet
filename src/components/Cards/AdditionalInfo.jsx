export const AdditionalInfo = ({ data = null }) => {
  return (
    <div className="text-xs font-bold">
      <div className="grid grid-cols-3">
        <div>cancelation: *rate*</div>
        <div>depth of feedback: *rate*</div>
        <div>product sense: *rate*</div>
      </div>
      <div className="grid grid-cols-3">
        <div>analytics and metrics: *rate</div>
        <div>behavioral: *rate</div>
      </div>
    </div>
  );
};
