/** @format */
import bodyParser from "body-parser";
class Http {
    static mount(_express) {
        _express.use(bodyParser.json());
        return _express;
    }
}
export default Http;
