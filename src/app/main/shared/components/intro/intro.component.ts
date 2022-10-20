import { Component, Input, OnInit } from '@angular/core'
import { IStatistic } from '../../intercases'

@Component({
   selector: 'app-intro',
   templateUrl: './intro.component.html',
   styleUrls: ['./intro.component.scss']
})

export class IntroComponent implements OnInit {
   @Input() introType? = 'course'
   @Input() introSubTitle
   @Input() introBigTitle
   @Input() introDescription
   @Input() introCourseInfo?: string[]
   @Input() introImgUrl?: string
   @Input() introStatistic?: IStatistic[]
   ngOnInit() {
      console.log(this.introImgUrl)
   }
}
