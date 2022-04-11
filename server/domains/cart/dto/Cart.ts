import Item from './Item';

export default class Cart {
  public id: number;

  public userId: number;

  public items: Item[];

  public createdAt: Date;

  public updatedAt: Date;
}
