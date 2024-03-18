import { TestimonialCard } from "./TestimonialCard";

export const Testimonials = () => {
  const TESTIMONIALS = [
    {
      id: 1,
      name: "John Doe",
      position: "Position",
      company: "Company",
      photo:
        "https://candidace-public-storage.s3.ap-south-1.amazonaws.com/default.png",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
      star: 5,
    },
    {
      id: 2,
      name: "John Doe",
      position: "Position",
      company: "Company",
      photo:
        "https://candidace-public-storage.s3.ap-south-1.amazonaws.com/default.png",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
      star: 5,
    },
    {
      id: 3,
      name: "John Doe",
      position: "Position",
      company: "Company",
      photo:
        "https://candidace-public-storage.s3.ap-south-1.amazonaws.com/default.png",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
      star: 5,
    },
    {
      id: 4,
      name: "John Doe",
      position: "Position",
      company: "Company",
      photo:
        "https://candidace-public-storage.s3.ap-south-1.amazonaws.com/default.png",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
      star: 5,
    },
    {
      id: 5,
      name: "John Doe",
      position: "Position",
      company: "Company",
      photo:
        "https://candidace-public-storage.s3.ap-south-1.amazonaws.com/default.png",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
      star: 5,
    },
    {
      id: 6,
      name: "John Doe",
      position: "Position",
      company: "Company",
      photo:
        "https://candidace-public-storage.s3.ap-south-1.amazonaws.com/default.png",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
      star: 5,
    },
  ];

  return (
    <div className="bg-white px-10 py-16">
      <div className="text-center pb-6">
        <div className="text-4xl font-bold">Customer testimonials</div>
        <div className="text-base font-medium">
          See what our users are saying about their experience
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
        {TESTIMONIALS.map((tm) => (
          <TestimonialCard data={tm} key={tm.id} />
        ))}
      </div>
    </div>
  );
};
