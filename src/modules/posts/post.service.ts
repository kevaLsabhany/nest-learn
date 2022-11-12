import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { Post } from "./post.entity";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>
  ) {}

  async getAllPosts(): Promise<Post[]> {
    return await this.postsRepository.find();
  }

  async getPostById(id: number): Promise<Post> {
    const post = this.postsRepository.findOne({
      where: {
        id
      }
    });
    if (post) return post;
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async createPost(post: CreatePostDto) {
    const newPost = new Post();
    newPost.title = post.title;
    newPost.content = post.content;
    await this.postsRepository.save(newPost);
  }

  async updatePost(id: number, post: UpdatePostDto) {
    const updatedPost = await this.postsRepository.update(id, post);
    if(updatedPost) return updatedPost;
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async deletePost(id: number) {
    return await this.postsRepository.delete(id);
  }
}