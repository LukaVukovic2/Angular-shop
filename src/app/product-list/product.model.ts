export class Product{
  constructor(
    public id: number, 
    public name: string, 
    public price: number,
    public quantity: number, 
    public category: string, 
    public imagePath: string, 
    public description: string
  ){}
}