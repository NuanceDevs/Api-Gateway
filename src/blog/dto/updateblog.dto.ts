import { IsNotEmpty } from 'class-validator';

export class UpdateBlogDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;
}
