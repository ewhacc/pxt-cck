/**
 * Control micro servos
 */
//% color="#00A074" weight=88 icon="\uf021" 

namespace servos {
    //% fixedInstances
    export class Servo {
        private _minAngle: number;
        private _maxAngle: number;
        private _stopOnNeutral: boolean;

        constructor() {
            this._minAngle = 0;
            this._maxAngle = 180;
            this._stopOnNeutral = true;
        }

        private clampDegrees(degrees: number): number {
            degrees = degrees | 0;
            degrees = Math.clamp(this._minAngle, this._maxAngle, degrees);
            return degrees;
        }

        /**
         * Set the servo angle
         */
        //% weight=100 help=servos/set-angle
        //% blockId=servoservosetangle block="set %servo angle to %degrees=protractorPicker °"
        //% degrees.defl=90
        //% servo.fieldEditor="gridpicker"
        //% servo.fieldOptions.width=220
        //% servo.fieldOptions.columns=2
        //% parts=microservo trackArgs=0
        setAngle(degrees: number) {
            degrees = this.clampDegrees(degrees);
            this.internalSetAngle(degrees);
        }

        protected internalSetAngle(angle: number): void {

        }

        /**
         * Set the throttle on a continuous servo
         * @param speed the throttle of the motor from -100% to 100%
         */
        //% weight=99 help=servos/run
        //% blockId=servoservorun block="continuous %servo run at %speed=speedPicker \\%"
        //% servo.fieldEditor="gridpicker"
        //% servo.fieldOptions.width=220
        //% servo.fieldOptions.columns=2
        //% parts=microservo trackArgs=0
        run(speed: number): void {
            const degrees = this.clampDegrees(Math.map(speed, -100, 100, this._minAngle, this._maxAngle));
            const neutral = (this.maxAngle - this.minAngle) >> 1;
            if (this._stopOnNeutral && degrees == neutral)
                this.stop();
            else
                this.setAngle(degrees);
        }

        /**
         * Stop sending commands to the servo so that its rotation will stop at the current position.
         */
        // On a normal servo this will stop the servo where it is, rather than return it to neutral position.
        // It will also not provide any holding force.
        //% weight=10 help=servos/stop
        //% blockId=servoservostop block="stop %servo"
        //% servo.fieldEditor="gridpicker"
        //% servo.fieldOptions.width=220
        //% servo.fieldOptions.columns=2
        //% parts=microservo trackArgs=0
        stop() {
            this.internalStop();
        }

        /**
         * Gets the minimum angle for the servo
         */
        public get minAngle() {
            return this._minAngle;
        }

        /**
         * Gets the maximum angle for the servo
         */
        public get maxAngle() {
            return this._maxAngle;
        }

        /**
         * Set the possible rotation range angles for the servo between 0 and 180
         * @param minAngle the minimum angle from 0 to 90
         * @param maxAngle the maximum angle from 90 to 180
         */
        //% help=servos/set-range
        //% blockId=servosetrange block="set %servo range from %minAngle to %maxAngle"
        //% minAngle.min=0 minAngle.max=90
        //% maxAngle.min=90 maxAngle.max=180 maxAngle.defl=180
        //% servo.fieldEditor="gridpicker"
        //% servo.fieldOptions.width=220
        //% servo.fieldOptions.columns=2
        //% parts=microservo trackArgs=0
        //% blockGap=8
        public setRange(minAngle: number, maxAngle: number) {
            this._minAngle = Math.max(0, Math.min(90, minAngle | 0));
            this._maxAngle = Math.max(90, Math.min(180, maxAngle | 0));
        }


        protected internalStop() { }
    }

    export class PinServo extends Servo {
        private _pin: MicrobitPin;

        constructor(pin: MicrobitPin) {
            super();
            this._pin = pin;
        }

        protected internalSetAngle(angle: number): void {
            this._pin.servoWrite(angle);
        }

        protected internalStop() {
            this._pin.digitalWrite(false);
        }
    }

    //% block="servo P0" fixedInstance whenUsed
    export const P0 = new servos.PinServo(new MicrobitPin(DigitalPin.P0));
    //% block="servo P1" fixedInstance whenUsed
    export const P1 = new servos.PinServo(new MicrobitPin(DigitalPin.P1));
    //% block="servo P2" fixedInstance whenUsed
    export const P2 = new servos.PinServo(new MicrobitPin(DigitalPin.P2));
    //% block="servo P8" fixedInstance whenUsed
    export const P8 = new servos.PinServo(new MicrobitPin(DigitalPin.P8));
    //% block="servo P13" fixedInstance whenUsed
    export const P13 = new servos.PinServo(new MicrobitPin(DigitalPin.P13));
    //% block="servo P14" fixedInstance whenUsed
    export const P14 = new servos.PinServo(new MicrobitPin(DigitalPin.P14));

}
