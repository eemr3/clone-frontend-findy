import Icon, { CaretRight } from "@phosphor-icons/react";
import { SVGAttributes, cloneElement } from "react";

import { Heading } from "./Heading";
import { CustomerLink } from "./Link";
import { Text } from "./Text";

type CardColorComposition = {
  cardColor: string;
  cardBackground: string;
  iconColor: string;
  headingColor: string;
  linkColor: string;
  linkColorHover: string;
  CaretRightColor: string;
  CaretRightColorHover: string;
};

interface CategoryCardProps {
  icon: Icon.IconProps | SVGAttributes<SVGSVGElement>;
  /* icon: JSX.Element; */
  title: string;
  linkText: string;
  cardColor: "blue dark" | "white";
}

export function CategoryCard({
  icon,
  title,
  linkText,
  cardColor,
}: CategoryCardProps) {
  const cardsColorComposition: CardColorComposition[] = [
    {
      cardColor: "blue dark",
      cardBackground: "bg-blue-dark",
      iconColor: "#F9F9F9",
      headingColor: "text-grey-#5",
      linkColor: "text-grey-#4",
      linkColorHover: "hover:text-grey-#3",
      CaretRightColor: "text-grey-#4",
      CaretRightColorHover: "group-hover:text-grey-#3",
    },
    {
      cardColor: "white",
      cardBackground: "bg-grey-#5",
      iconColor: "#01A195",
      headingColor: "text-grey-#1",
      linkColor: "text-green-dark",
      linkColorHover: "group-hover:text-green-medium",
      CaretRightColor: "text-grey-#1",
      CaretRightColorHover: "group-hover:text-grey-#2",
    },
  ];

  const {
    cardBackground,
    iconColor,
    headingColor,
    linkColor,
    linkColorHover,
    CaretRightColor,
    CaretRightColorHover,
  } = cardsColorComposition.filter(
    (cardsColorComposition) => cardsColorComposition.cardColor == cardColor
  )[0];

  return (
    <div
      className={`flex h-[33.9rem] w-[33.4rem] flex-col rounded-[0.8rem] pl-[4.9rem] ${cardBackground} shadow-shadow-#2-card border-[0.1rem] border-blue-dark`}
    >
      <div className="mt-[5.96rem] flex h-[9.5rem] ">
        {cloneElement(icon as JSX.Element, {
          className: "my-auto",
          color: iconColor,
        })}
      </div>

      <Heading
        type="xs"
        className={`mt-[4.3rem] tracking-[0.05rem] ${headingColor}`}
      >
        {title}
      </Heading>

      <CustomerLink type="card" className={`group mt-[3.04rem] flex items-center`}>
        <Text
          type="md"
          className={`w-[19.2rem] ${linkColor} ${linkColorHover}`}
        >
          {linkText}
        </Text>

        <CaretRight
          size="2rem"
          weight="bold"
          className={`mt-[0.3rem] ${CaretRightColor} ${CaretRightColorHover}`}
        />
      </CustomerLink>
    </div>
  );
}
