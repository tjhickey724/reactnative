/* arrow function syntax */
const sq = (x) => x*x;

/* anonymous function */
const cube2 = 
    function (x) { 
        return(x*x*x);
    };

/* old style function */
function circle_area(r) {
    return (Math.PI*r*r);
};

// Destructuring examples...
const power_fns = [sq,  cube,  (r)=> sq(sq(r)), function(z){return z**5}];
const power_obj = {sq:sq, cube:cube, fourthpower:(r) => sq(sq(r))}


const {cube,fourthpower} = power_obj;
  // matches sq and fourthpower keys, and assigns those values to new variables called sq and fourthpower

  const cylinder_volume= (r,h) => Math.PI*sq(r)*h;
  const x = fourthpower(5)

export {cube,circle_area,cylinder_volume,power_fns,power_obj};
export default sq;