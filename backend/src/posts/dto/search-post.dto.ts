import { IsString, IsOptional } from 'class-validator';

export class SearchPostsDto {
  @IsOptional()
  @IsString()
  readonly title?: string;
}
