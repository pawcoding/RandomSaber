import { TestBed } from '@angular/core/testing'

import { SongService } from './song.service'
import createSpyObj = jasmine.createSpyObj
import { HttpClient } from '@angular/common/http'

describe('SongService', () => {
  let service: SongService
  const httpClientSpy = createSpyObj('HttpClient', ['get'])

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientSpy,
        },
      ],
    })
    service = TestBed.inject(SongService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
