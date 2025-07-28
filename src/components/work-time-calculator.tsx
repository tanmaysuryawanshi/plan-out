'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function WorkTimeCalculator() {
    const [punchTime, setPunchTime] = useState('');
    const [hoursWorked, setHoursWorked] = useState<number>(0);
    const [minutesWorked, setMinutesWorked] = useState<number>(0);
    const [result, setResult] = useState('');

    const handleCalculate = () => {
        if (!punchTime) {
            setResult("⚠️ Please enter your punch-in time.");
            return;
        }

        const [hourStr, minuteStr] = punchTime.split(':');
        const now = new Date();
        const punchDate = new Date(now);
        punchDate.setHours(parseInt(hourStr), parseInt(minuteStr), 0, 0);

        const totalMinutesWorked = hoursWorked * 60 + minutesWorked;
        const requiredMinutes = 8 * 60;

        if (totalMinutesWorked >= requiredMinutes) {
            setResult('✅ You can leave now or relax until 9:00 PM');
            return;
        }

        const minutesLeft = requiredMinutes - totalMinutesWorked;
        const leaveTime = new Date(punchDate.getTime() + minutesLeft * 60 * 1000);

        const formatted = leaveTime.toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
        });

        setResult(`🕒 You can leave at ${formatted}`);
    };

    return (
        <Card className="max-w-md mx-auto mt-10 p-6">
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="punchTime">Last Punch-In</Label>
                        <Input
                            type="time"
                            id="punchTime"
                            value={punchTime}
                            onChange={(e) => setPunchTime(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-4">
                        <div>
                            <Label htmlFor="hours">Hours Worked</Label>
                            <Input
                                type="number"
                                id="hours"
                                min={0}
                                value={hoursWorked}
                                onChange={(e) => setHoursWorked(parseInt(e.target.value) || 0)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="minutes">Minutes Worked</Label>
                            <Input
                                type="number"
                                id="minutes"
                                min={0}
                                max={59}
                                value={minutesWorked}
                                onChange={(e) => setMinutesWorked(parseInt(e.target.value) || 0)}
                            />
                        </div>
                    </div>

                    <Button className="w-full" onClick={handleCalculate}>
                        Calculate Leave Time
                    </Button>

                    {result && <p className="text-lg font-semibold mt-4">{result}</p>}
                </div>
            </CardContent>
        </Card>
    );
}
