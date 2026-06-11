import { menuCoordinates } from "../data/MenuCoordinates";

const getDistance = (x1:number, y1:number, x2:number, y2:number) => {
    return Math.sqrt((x2 - x1)**2 + (y2 - y1)**2);
}

export const getNearMenu = (x:number, y:number) => {
    let min_d = 100;
    let result;
    for(var i=0; i<menuCoordinates.length; i++) {
        const d = getDistance(x, y, menuCoordinates[i]["x"], menuCoordinates[i]["y"]);
        if(d < min_d) {
            result = menuCoordinates[i];
            min_d = d;
        }
    }
    console.log(min_d);
    console.log(result);
    return result;
}