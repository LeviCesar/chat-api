import { HasMany, HasOne, Table, Model } from "sequelize-typescript";
import { AccountSession } from "./account-session.entity"
import { AccountUser } from "./account-user.entity"
import { HasOneCreateAssociationMixin, HasOneSetAssociationMixin } from "sequelize";

@Table({
  tableName: "account",
  underscored: true,
  paranoid: true,
})
export class Account extends Model {
  @HasOne(() => AccountUser, "accountId")
  declare user: AccountUser;

  declare createUser: HasOneCreateAssociationMixin<AccountUser>;
  // declare setUser: HasOneSetAssociationMixin<
  //   AccountUser,
  //   /* this is the type of the primary key of the target */
  //   AccountUser['accountId']
  // >;

  @HasMany(() => AccountSession, "accountId")
  declare sessions: AccountSession[];
  
  declare createSession: HasOneCreateAssociationMixin<AccountSession>;
}
