import FreeFallPlot from "@/app/kinematics/free-fall/_components/freeFallPlot";
import { Button } from "@/components/ui/button";
import CardWrapper from "@/components/ui/card-wrapper";
import { GraphProps } from "@/lib/types";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const Plot = ({ data, isVelocity, setIsVelocity, buttonTitle }: PlotProps) => {
  return (
    <CardWrapper className="flex flex-col">
      <FreeFallPlot
        className="flex justify-center w-full h-full"
        data={data.data}
        layout={data.layout}
      />
      <div className="w-full flex justify-end">
        <Button
          variant="link"
          className="text-primary flex group hover:no-underline"
          onClick={() => setIsVelocity(!isVelocity)}
        >
          <div className="group-hover:-translate-x-1 transition">
            {buttonTitle}
          </div>
          <ArrowRightAltIcon className="justify-self-center group-hover:translate-x-1 transition" />
        </Button>
      </div>
    </CardWrapper>
  );
};

export default Plot;

type PlotProps = {
  data: GraphProps;
  isVelocity: boolean;
  setIsVelocity: (value: boolean) => void;
  buttonTitle: string;
};
