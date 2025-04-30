import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, Length } from "class-validator";
import { AuthMethod } from "../enums/method.enum";
import { AuthType } from "../enums/type.enum";


export class AuthDto {
    @ApiProperty()
    @IsString()
    @Length(3,100)
    username:string // phone or email or username
    @ApiProperty({enum:AuthMethod})
    @IsEnum(AuthMethod)
    method:AuthMethod

    @ApiProperty({enum:AuthType})
    @IsEnum(AuthType)
    type:AuthType
}