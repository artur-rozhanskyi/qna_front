import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { reducers } from './store/app.reducers';
import { environment } from '../environments/environment';
import { ApiInterceptor } from './shared/api.interceptor';
import { AuthEffects } from './auth/store/auth.effects';
import { SnakeCaseInterceptor } from './shared/snake-case.interceptor';
import { TokenInterceptor } from './shared/token.interceptor';
import { ApiService } from './api.service';
import { CamelCaseResponceInterceptor } from './shared/camel-case-responce.intercetor';
import { WebSocketService } from './cable/websocket.service';
import { QuestionSocketService } from './cable/question-socket.service.service';
import { ChannelService } from './cable/channel.service';
import { AnswerSocketService } from './cable/answer-socket.service';
import { CommentSocketService } from './cable/comment-socket.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    EffectsModule.forRoot([AuthEffects]),
    HeaderModule,
    HttpClientModule,
    RouterModule,
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    ApiService,
    WebSocketService,
    QuestionSocketService,
    AnswerSocketService,
    CommentSocketService,
    ChannelService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SnakeCaseInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CamelCaseResponceInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
