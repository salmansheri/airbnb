"use client";

import { IconType } from "react-icons";
import Container from "../Container";
import { TbBeach } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { MdOutlineVilla } from "react-icons/md";
import { TbMountain, TbPool } from "react-icons/tb";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is Property is modern",
  },

  {
    label: "CountrySide",
    icon: TbMountain,
    description: "This property is Property is Countryside",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property is Property is Pool",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is Property is Island",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is Property is Lake",
  },
  {
    label: "Scheme",
    icon: FaSkiing,
    description: "This property is Property has Skiing Activities ",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is a Castle ",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property is a Camping Activities ",
  },

  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property is a Arctic ",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is in a Cave ",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the Desert ",
  },

  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in the Barn ",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is in the Lux ",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
