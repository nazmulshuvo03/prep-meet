import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProfession,
  fetchProfessions,
} from "../store/middlewares/profession";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import {
  addExperienceType,
  addSkill,
  deleteExperienceType,
  deleteSkill,
} from "../store/middlewares/skill";
import { setToastMessage } from "../store/slices/global";

const Section = ({
  children,
  title = "Section",
  profession = "",
  actionHandler = () => {},
}) => {
  const dispatch = useDispatch();
  const [state, setState] = useState();

  const handleAdd = () => {
    if (!state || state === " ") {
      dispatch(setToastMessage("Empty input"));
    } else {
      dispatch(
        actionHandler({
          name: state,
          profession_id: profession,
        })
      );
    }
  };
  return (
    <div className="flex flex-col border rounded-md m-1 w-full h-full overflow-y-auto">
      <div className="bg-gray-700 text-white text-center py-1">{title}</div>
      <div className="flex-1">
        <div className="flex flex-wrap">{children}</div>
      </div>
      <div className="px-2 my-2 flex gap-2">
        <Input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <Button onClick={handleAdd}>Add New</Button>
      </div>
    </div>
  );
};

const Chip = ({ children, deleteHandler = () => {} }) => (
  <div className="flex items-center m-1 py-1 px-2 border border-gray-400 rounded-full">
    <div className="pl-3 pr-2 text-sm">{children}</div>
    <div
      className="bg-gray-400 rounded-full text-xs text-white text-center h-4 w-4 cursor-pointer"
      onClick={deleteHandler}
    >
      x
    </div>
  </div>
);

const Admin = () => {
  const dispatch = useDispatch();
  const professions = useSelector((state) => state.profession.items);

  useEffect(() => {
    dispatch(fetchProfessions());
  }, []);

  const addNewProfession = (data) => {
    dispatch(addProfession(data));
  };

  console.log("@@@@@@@", professions);

  return (
    <div>
      <div className="flex items-center gap-2">
        <Input className="" type="text" />
        <Button className="">Add Profession</Button>
      </div>
      {professions && professions.length ? (
        professions.map((profession) => {
          return (
            <div
              key={profession.id}
              className="my-4 rounded-md border border-gray-200"
            >
              <div className="bg-secondary text-white font-bold text-lg py-2 px-3 rounded-t-md">
                {profession.name}
              </div>
              <div className="p-1 mb-2 flex justify-between items-start h-60">
                <Section
                  title="Skills"
                  profession={profession.id}
                  actionHandler={addSkill}
                >
                  {profession.skills && profession.skills.length ? (
                    profession.skills.map((skill) => {
                      return (
                        <Chip
                          key={skill.id}
                          deleteHandler={() => dispatch(deleteSkill(skill.id))}
                        >
                          {skill.name}
                        </Chip>
                      );
                    })
                  ) : (
                    <div />
                  )}
                </Section>
                <Section
                  title="Experience Types"
                  profession={profession.id}
                  actionHandler={addExperienceType}
                >
                  {profession.experienceTypes &&
                  profession.experienceTypes.length ? (
                    profession.experienceTypes.map((et) => {
                      return (
                        <Chip
                          key={et.id}
                          deleteHandler={() =>
                            dispatch(deleteExperienceType(et.id))
                          }
                        >
                          {et.name}
                        </Chip>
                      );
                    })
                  ) : (
                    <div />
                  )}
                </Section>
              </div>
            </div>
          );
        })
      ) : (
        <div />
      )}
    </div>
  );
};

export default Admin;
