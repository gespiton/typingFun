import main from "./manager";
const App = function () {
  main({
    container: $('#screen')[0],
    text: "In ima this course, Rob Conery takes you beyond the simple demo with Node.js and talks about ways you can structure your application, your code, and your tests. Along the way he'll discuss various JavaScript patterns and Node toolsets."
  });
};
export default App;
// adjust speed according to user speed
//todo draw gradient background after succeed