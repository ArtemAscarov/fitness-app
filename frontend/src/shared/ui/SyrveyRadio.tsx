import { cn } from "../lib/cn";

type Props = {
  item: target;
  className?: string;
  onClick: () => any;
  isActive?: boolean;
};

type target = {
  name: string;
  slug: string;
  description?: string;
};

export default function SyrveyRadio({
  item,
  className,
  isActive,
  onClick,
}: Props) {
  return (
    <button
      onClick={() => onClick()}
      className={cn(
        "px-5 w-full block text-center py-2.5 bg-[#253141] rounded-md hover:bg-[#304056] transition-all duration-200 hover:border-[#3479d2] border border-[#0000] cursor-pointer",
        isActive ? "bg-[#3479d2] hover:bg-[#3479d2]" : "",
        className
      )}
    >
      {item.name}

      <p className="text-[#dee0e1]">{item?.description}</p>
    </button>
  );
}
