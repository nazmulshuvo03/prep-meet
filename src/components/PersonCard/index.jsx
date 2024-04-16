import { ImageArea } from "./ImageArea";
import { WorkInfo } from "./WorkInfo";
import { ActionArea } from "./ActionArea";
import { useDispatch, useSelector } from "react-redux";
import { getDataLabelFromKey } from "../../utils/data";
import { BookSlot } from "./BookSlot";
import { useState } from "react";
import { Modal } from "../Modal";
import { createMeeting } from "../../store/middlewares/meeting";

export const PersonCard = ({ data }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.profile);
  const preparationStages = useSelector(
    (state) => state.static.preparationStages
  );

  const [selectedBook, setSelectedBook] = useState(false);

  const handleBook = async () => {
    const payload = {
      availabilityId: selectedBook.id,
      acceptorId: user.id,
      initiatorId: data.id,
    };
    await dispatch(createMeeting(payload, "people"));
    setSelectedBook();
  };

  return (
    <div className="w-full h-fit bg-white rounded-md shadow-md px-2 md:px-4 py-2">
      <div className="grid md:grid-cols-12 grid-cols-1 border-b relative">
        <div className="col-span-2">
          <ImageArea data={data} />
        </div>
        <div className="col-span-10">
          <WorkInfo data={data} />
        </div>
        <div className={"absolute right-0 top-0 flex items-center gap-2"}>
          <div className="text-gray-600 text-xs">
            {data.preparationStage
              ? getDataLabelFromKey(preparationStages, data.preparationStage)
              : ""}
          </div>
          {/* <IconButton>
            <FontAwesomeIcon
              icon={faHeart}
              className="text-gray-300 !text-lg"
            />
          </IconButton> */}
        </div>
      </div>
      <div className="pt-2">
        <ActionArea data={data} onNextAvailableClick={setSelectedBook} />
      </div>
      {selectedBook ? (
        <Modal handleClose={() => setSelectedBook()} className="!w-1/2 !h-2/3">
          <BookSlot
            data={data}
            selected={selectedBook}
            setSelected={setSelectedBook}
            handleClose={() => setSelectedBook()}
            handleBook={handleBook}
          />
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};
