import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "../../Button/IconButton";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";

export const ProfilePhoto = ({ newPP, setNewPP, profile, handlePPSubmit }) => {
  return (
    <>
      <label>
        <img
          src={newPP ? URL.createObjectURL(newPP) : profile.photoURL}
          alt={"Person Profile Image"}
          className="h-16 w-16 md:h-32 md:w-32 rounded-full my-2"
        />
        <input
          className="hidden"
          type="file"
          accept="image/*"
          name="photoURL"
          onChange={(e) => {
            const file = e.target.files[0];
            setNewPP(file);
          }}
        />
      </label>
      {newPP ? (
        <div className="flex items-center gap-4">
          <IconButton
            onClick={handlePPSubmit}
            className="!text-green-400 !px-2 !py-1 rounded-full"
          >
            <FontAwesomeIcon icon={faCheck} />
          </IconButton>
          <IconButton
            onClick={() => setNewPP()}
            className="!text-red-400 !px-2.5 !py-1 rounded-full"
          >
            <FontAwesomeIcon icon={faClose} />
          </IconButton>
        </div>
      ) : (
        <div />
      )}
    </>
  );
};
