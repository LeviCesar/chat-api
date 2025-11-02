import { HasMany, HasOne, Table, Model } from "sequelize-typescript";
import { AccountSession } from "./account-session.model"
import { AccountUser } from "./account-user.model"
import { HasManyCreateAssociationMixin, HasOneCreateAssociationMixin } from "sequelize";

@Table({
  tableName: "account",
  underscored: true,
  paranoid: true,
})
export class Account extends Model {
  @HasOne(() => AccountUser, "accountId")
  declare user: AccountUser;
  declare createUser: HasOneCreateAssociationMixin<AccountUser>;

  @HasMany(() => AccountSession, "accountId")
  declare sessions: AccountSession[];
  declare createSession: HasManyCreateAssociationMixin<AccountSession, 'accountId'>;
}
