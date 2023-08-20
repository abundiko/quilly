import {
  FaTrophy,
  FaHeart,
  FaBookOpen,
  FaLightbulb,
  FaUsers,
  FaRocket
} from "react-icons/fa";

export default function WhyChooseUs() {
  return (
    <section className="py-16 relative app-theme">
      <div className="app-container justify-center">
        <h1 className="font-bold text-3xl md:text-5xl mb-5 md:mb-8 w-full">
          Check This Out!
        </h1>
        {whyChooseUsData.map((item, i) =>
          <WhyChooseUsCard key={item.title} {...item} index={i} />
        )}
      </div>
    </section>
  );
}

interface WhyChooseUsProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const WhyChooseUsCard = ({
  icon,
  title,
  subtitle,
  index
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  index: number;
}) => {
  const themeClass =
    "bg-primary-dark dark:bg-light dim:bg-light text-light dark:text-dark dim:text-dark";
  return (
    <div
      className={`p-4 lg:p-6 w-11/12 sm:w-6/12 md:w-4/12 border app-borders ${index %
        2 ==
        0 && themeClass}`}
    >
      {icon}
      <h4 className="text-xl font-bold">
        {title}
      </h4>
      <p className="opacity-70">
        {subtitle}
      </p>
    </div>
  );
};

const whyChooseUsData: WhyChooseUsProps[] = [
  {
    icon: <FaTrophy className="text-6xl" />,
    title: "Outstanding Achievement",
    subtitle:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impressive accomplishments recognized by all."
  },
  {
    icon: <FaHeart className="text-6xl" />,
    title: "Unconditional Love",
    subtitle:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. A deep affection that knows no bounds."
  },
  {
    icon: <FaBookOpen className="text-6xl" />,
    title: "Endless Knowledge",
    subtitle:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. A wealth of wisdom waiting to be explored."
  },
  {
    icon: <FaLightbulb className="text-6xl" />,
    title: "Inspired Ideas",
    subtitle:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. A spark of creativity that illuminates the mind."
  },
  {
    icon: <FaUsers className="text-6xl" />,
    title: "Strong Community",
    subtitle:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. A supportive network that embraces diversity."
  },
  {
    icon: <FaRocket className="text-6xl" />,
    title: "Unleash Potential",
    subtitle:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Igniting the drive for limitless growth."
  }
];
