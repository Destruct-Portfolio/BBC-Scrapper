import Http from "./http.js";
class bootstrap {
    static init(_express) {
        _express = Http.mount(_express);
        return _express;
    }
}
export default bootstrap;
