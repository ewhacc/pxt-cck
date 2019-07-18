// go round
input.onButtonPressed(Button.A, () => {
    cckmotor.motorOn(cckmotor.Motors.Motor1, cckmotor.MotorDirection.Forward, 100);
    cckmotor.motorOn(cckmotor.Motors.Motor2, cckmotor.MotorDirection.Reverse, 100);
})
// go forward
input.onButtonPressed(Button.B, () => {
    cckmotor.motorOn(cckmotor.Motors.Motor1, cckmotor.MotorDirection.Reverse, 100);
    cckmotor.motorOn(cckmotor.Motors.Motor2, cckmotor.MotorDirection.Forward, 100);
})
// stop
input.onButtonPressed(Button.AB, () => {
    cckmotor.motorOff(cckmotor.Motors.Motor1);
    cckmotor.motorOff(cckmotor.Motors.Motor2);
})
