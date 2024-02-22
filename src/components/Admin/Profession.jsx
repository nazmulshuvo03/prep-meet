import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProfession,
  fetchProfessions,
} from "../../store/middlewares/profession";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import {
  addExperienceType,
  addSkill,
  deleteExperienceType,
  deleteSkill,
} from "../../store/middlewares/skill";
import { Section } from "./CommonSection";
import { Chip } from "./Chip";
import { Skills } from "./Skills";
import { ExperienceTypes } from "./ExperienceTypes";

const ProfessionAdmin = () => {
  const dispatch = useDispatch();
  const professions = useSelector((state) => state.profession.items);

  useEffect(() => {
    dispatch(fetchProfessions());
  }, []);

  const addNewProfession = (data) => {
    dispatch(addProfession(data));
  };

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
                <Skills professionId={profession.id} data={profession.skills} />
                <ExperienceTypes
                  professionId={profession.id}
                  data={profession.experienceTypes}
                />
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

export default ProfessionAdmin;
