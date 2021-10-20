/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */
enum Unidad_Distancia {
    //% block="mm" enumval=0
    Unidad_Distancia_mm,

    //% block="cm" enumval=1
    Unidad_Distancia_cm,

    //% block="inch" enumval=2
    Unidad_Distancia_inch,
}


/**
* Custom blocks
*/
//% color=#0fbc11 icon="\uf140"
namespace sonarbit {

    /**
    * obté la distancia ultrasonica
    */
    //% blockId=sonarbit block="Ultrasonic distance in unit %unidad_distancia |at|pin %pin"
    //% weight=10
    export function sonarbit_distancia(unidad_distancia: Unidad_Distancia, pin: DigitalPin): number {

        // send pulse
        pins.setPull(pin, PinPullMode.PullNone)
        pins.digitalWritePin(pin, 0)
        control.waitMicros(2)
        pins.digitalWritePin(pin, 1)
        control.waitMicros(10)
        pins.digitalWritePin(pin, 0)

        // read pulse
        let d = pins.pulseIn(pin, PulseValue.High, 25000)  // 8 / 340 = 
        let distancia = d * 9 / 6 / 58

        if (distancia > 400) {
            distancia = 0
        }

        switch (unidad_distancia) {
            case 0:
                return Math.floor(distancia * 10) //mm
                break
            case 1:
                return Math.floor(distancia)  //cm
                break
            case 2:
                return Math.floor(distancia / 254)   //inch
                break
            default:
                return 0
        }

    }

}
