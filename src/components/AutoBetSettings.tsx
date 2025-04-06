
import React from "react";
import { useGame } from "@/contexts/GameContext";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AutoBetSettingsProps {
  betIndex: number;
}

const AutoBetSettings: React.FC<AutoBetSettingsProps> = ({ betIndex }) => {
  const { userBet, updateAutoBetSettings } = useGame();
  const settings = userBet[betIndex].autoSettings;

  const handleAutoCashoutChange = (value: number[]) => {
    updateAutoBetSettings({ autoCashout: value[0] }, betIndex);
  };

  const handleAutoCashoutInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 1.1;
    // Ensure the value is within the valid range
    const clampedValue = Math.min(Math.max(value, 1.1), 10);
    updateAutoBetSettings({ autoCashout: clampedValue }, betIndex);
  };

  const handleStopOnWinChange = (checked: boolean) => {
    updateAutoBetSettings({ stopOnWin: checked }, betIndex);
  };

  const handleStopOnLossChange = (checked: boolean) => {
    updateAutoBetSettings({ stopOnLoss: checked }, betIndex);
  };

  const handleStopAfterBetsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    updateAutoBetSettings({ stopAfterBets: value }, betIndex);
  };

  return (
    <div className="bg-aviator-gray p-3 rounded-lg mb-4">
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <Label className="text-white">Auto Cash Out at</Label>
          <Input
            type="number"
            className="w-20 h-8 text-right"
            value={settings.autoCashout.toFixed(1)}
            onChange={handleAutoCashoutInputChange}
            min={1.1}
            max={10}
            step={0.1}
          />
        </div>
        <Slider
          value={[settings.autoCashout]}
          min={1.1}
          max={10}
          step={0.1}
          onValueChange={handleAutoCashoutChange}
          className="mb-2"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-white">Stop on Win</Label>
          <Switch
            checked={settings.stopOnWin}
            onCheckedChange={handleStopOnWinChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-white">Stop on Loss</Label>
          <Switch
            checked={settings.stopOnLoss}
            onCheckedChange={handleStopOnLossChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-white">Stop After Bets</Label>
          <Input
            type="number"
            className="w-20 h-8"
            value={settings.stopAfterBets}
            onChange={handleStopAfterBetsChange}
            min={0}
          />
        </div>
      </div>
    </div>
  );
};

export default AutoBetSettings;
