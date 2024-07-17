import FreeFallPlot from "@/app/kinematics/_components/freeFallPlot";
import { Button } from "@/components/ui/button";
import CardWrapper from "@/components/ui/cardWrapper";
import { GraphProps } from "@/lib/types";

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
          className="text-primary"
          onClick={() => setIsVelocity(!isVelocity)}
        >
          {buttonTitle}
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
