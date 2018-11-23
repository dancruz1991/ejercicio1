export class Product {


    constructor(_id = '', name = '', cost = 0, img = '') {
        this._id = _id;
        this.name = name;
        this.cost = cost;
        this.img = img;
    }


    _id: String;
    name: String;
    cost: Number;
    img: any;
}
