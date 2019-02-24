import {
	Controller,
	Post,
	Get,
	Put,
	Delete,
	Body,
	Param,
	UsePipes,
	Logger,
	UseGuards,
	Query,
} from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaDTO } from './idea.dto';
import { ValidationPipe } from '../shared/validation.pip';
import { AuthGuard } from 'src/shared/auth.guard';
import { User } from 'src/user/user.decorator';

@Controller('api/idea')
export class IdeaController {
	private logger = new Logger('ideaController');
	constructor(private ideaService: IdeaService) {}

	private logData(options: any) {
		options.user && this.logger.log(`USER ${JSON.stringify(options.user)}`);
		options.body && this.logger.log(`BODY ${JSON.stringify(options.body)}`);
		options.id && this.logger.log(`IDEA ${JSON.stringify(options.id)}`);
	}

	@Get()
	showAllIdeas(@Query('page') page: number) {
		return this.ideaService.showAll(page);
	}

	@Post()
	@UseGuards(new AuthGuard())
	@UsePipes(new ValidationPipe())
	createIdea(@User('id') user, @Body() data: IdeaDTO) {
		this.logData({ user, data });
		return this.ideaService.create(user, data);
	}

	@Get(':id')
	readIdea(@Param('id') id: string) {
		return this.ideaService.read(id);
	}

	@Put(':id')
	@UseGuards(new AuthGuard())
	@UsePipes(new ValidationPipe())
	updateIdea(
		@Param('id') id: string,
		@User('id') user: string,
		@Body() data: Partial<IdeaDTO>,
	) {
		this.logData({ id, data, user });
		return this.ideaService.update(id, user, data);
	}

	@Delete(':id')
	@UseGuards(new AuthGuard())
	destroyIdead(@Param('id') id: string, @User('id') user) {
		this.logData({ id, user });
		return this.ideaService.destroy(id, user);
	}

	@Post(':id/upvote')
	@UseGuards(new AuthGuard())
	upvoteIdea(@Param('id') id: string, @User('id') user) {
		this.logData({ id, user });
		return this.ideaService.upvote(id, user);
	}

	@Post(':id/downvote')
	@UseGuards(new AuthGuard())
	downvoteIdea(@Param('id') id: string, @User('id') user) {
		this.logData({ id, user });
		return this.ideaService.downvote(id, user);
	}

	@Post(':id/bookmark')
	@UseGuards(new AuthGuard())
	bookmarkIdea(@Param('id') id: string, @User('id') user) {
		this.logData({ id, user });
		return this.ideaService.bookmark(id, user);
	}

	@Delete(':id/bookmark')
	@UseGuards(new AuthGuard())
	unbookmarkIdea(@Param('id') id: string, @User('id') user) {
		this.logData({ id, user });
		return this.ideaService.unbookmark(id, user);
	}
}
