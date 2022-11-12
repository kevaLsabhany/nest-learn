import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PostService } from "./post.service";

@Controller("posts")
export class PostController {

  constructor(
    private readonly postsService: PostService
  ) {}

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param('id') id: number) {
    return this.postsService.getPostById(id);
  }

  @Post()
  createPost(@Body() post: CreatePostDto) {
    console.log(post);
    return this.postsService.createPost(post);
  }

  @Put(':id')
  updatePost(@Param('id') id: number, @Body() post: UpdatePostDto) {
    return this.postsService.updatePost(id, post);
  }

  @Delete(':id')
  deletePost(@Param('id') id: number) {
    return this.postsService.deletePost(id);
  }

}