import {
  Column,
  Table,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Unique,
  AllowNull,
  CreatedAt,
  UpdatedAt,
  Default,
} from 'sequelize-typescript';
import { EntityNames } from 'src/common/enums/entityName.enum';

@Table({
  tableName: EntityNames.User,

})
export class UserEntity extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  declare id: string;
  @Unique
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  username: string;

  @Unique
  @AllowNull(true)
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @Unique
  @AllowNull(false)
  @Column({
    type:DataType.STRING
  })

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  verify_email: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  verify_phone: boolean;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;
}
