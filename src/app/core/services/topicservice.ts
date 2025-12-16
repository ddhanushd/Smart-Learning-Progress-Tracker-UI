import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { Topic } from '../models/topic.model';


@Injectable({
  providedIn: 'root',
})
export class TopicService {
   private baseUrl = `${environment.apiBaseUrl}/topics`;

  constructor(private http: HttpClient) {}

  getAllTopics(): Observable<ApiResponse<Topic[]>> {
    return this.http.get<ApiResponse<Topic[]>>(this.baseUrl);
  }

  createTopic(payload: Partial<Topic>): Observable<ApiResponse<Topic>> {
    return this.http.post<ApiResponse<Topic>>(this.baseUrl, payload);
  }

  reviseTopic(id: string, confidence: number, note: string): Observable<ApiResponse<Topic>> {
    return this.http.put<ApiResponse<Topic>>(
      `${this.baseUrl}/${id}/revise`,
      { confidence, note }
    );
  }

  getStats(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.baseUrl}/stats`);
  }
   // Mark topic as complete
  markComplete(id: string): Observable<ApiResponse<Topic>> {
    return this.http.put<ApiResponse<Topic>>(`${this.baseUrl}/${id}/complete`, {});
  }

 getTopicById(id: string): Observable<ApiResponse<Topic>> {
   console.log('SERVICE getTopicById called with:', id);
  return this.http.get<ApiResponse<Topic>>(
    `${this.baseUrl}/${id}`
  );
}



  
}
