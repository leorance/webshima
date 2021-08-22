import { Component, OnInit, ElementRef, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CountService } from '../../services/count.service';
import { CountCandidateData } from '../../models/countCandidateData';

@Component({
  selector: 'app-election-count',
  templateUrl: './election-count.component.html',
  styleUrls: ['./election-count.component.scss']
})
export class ElectionCountComponent implements OnInit, OnChanges {
  duration: number;
  steps: number;
  candidate1: CountCandidateData;
  candidate2: CountCandidateData;
  candidate3: CountCandidateData;

  showCongrats = '';
  count = 0;
  digit1 = 0;
  digit2 = 0;
  digit3 = 0;

  @ViewChild('animatedDigit1') animatedDigit1: ElementRef;
  @ViewChild('animatedDigit2') animatedDigit2: ElementRef;
  @ViewChild('animatedDigit3') animatedDigit3: ElementRef;
  @ViewChild('congratsMessage') congratsMessage: ElementRef;
  @ViewChild('winnerMsg') winnerMsg: ElementRef;
  @ViewChild('pres') pres: ElementRef;
  @ViewChild('vicePres') vicePres: ElementRef;
  @ViewChild('message') message: ElementRef;

  displayDigit1 = 0;
  displayDigit2 = 0;
  displayDigit3 = 0;

  loading = false;
  startCount = false;

  constructor(
    private countService: CountService
  ) { }

  ngOnInit(): void {
    this.getCounter();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['digit1']) {
      this.animateCount(this.digit1, this.animatedDigit1, this.digit1, this.digit2, this.digit3, this.congratsMessage, this.winnerMsg,
        this.pres, this.vicePres, this.candidate1, this.candidate2, this.candidate3, this.message);
    } else if (changes['digit2']) {
      this.animateCount(this.digit2, this.animatedDigit2, this.digit1, this.digit2, this.digit3, this.congratsMessage, this.winnerMsg,
        this.pres, this.vicePres, this.candidate1, this.candidate2, this.candidate3, this.message);
    } else if (changes['digit3']) {
      this.animateCount(this.digit3, this.animatedDigit3, this.digit1, this.digit2, this.digit3, this.congratsMessage, this.winnerMsg,
        this.pres, this.vicePres, this.candidate1, this.candidate2, this.candidate3, this.message);
    }
  }

  async getCounter() {
    this.loading = true;
    try {
      const response = await this.countService.count().toPromise();
      if (response && response.status && response.status === 200) {
        if (response.data) {
          response.data.forEach(element => {
            if (element && element.candidate && element.candidate.choose_number) {
              if (Number(element.candidate.choose_number) === 1) {
                this.candidate1 = element.candidate;
                this.digit1 = element?.count;
              }
              if (Number(element.candidate.choose_number) === 2) {
                this.candidate2 = element.candidate;
                this.digit2 = element?.count;
              }
              if (Number(element.candidate.choose_number) === 3) {
                this.candidate3 = element.candidate;
                this.digit3 = element?.count;
              }
            }
          });
        }
      } else {
        alert('Get Data Failed. Try again later.');
      }
    } catch (error) {
      if (error && error.error && error.error.data) {
        alert('Get Data Failed. ' + error.error.data);
      } else {
        alert('Get Data Failed. Try again later.');
      }
    } finally {
      this.loading = false;
    }
  }

  counterClicked(): void {
    if (window.confirm('Start to count !')) {
      this.startCount = true;
      this.animateCount(this.digit1, this.animatedDigit1, this.digit1, this.digit2, this.digit3, this.congratsMessage, this.winnerMsg,
        this.pres, this.vicePres, this.candidate1, this.candidate2, this.candidate3, this.message);
      this.animateCount(this.digit2, this.animatedDigit2, this.digit1, this.digit2, this.digit3, this.congratsMessage, this.winnerMsg,
        this.pres, this.vicePres, this.candidate1, this.candidate2, this.candidate3, this.message);
      this.animateCount(this.digit3, this.animatedDigit3, this.digit1, this.digit2, this.digit3, this.congratsMessage, this.winnerMsg,
        this.pres, this.vicePres, this.candidate1, this.candidate2, this.candidate3, this.message);
    } else {
      console.log('cancel clicked');
    }
  }

  animateCount(digit, animatedDigit, digit1, digit2, digit3, congratsMessage, winnerMsg, pres, vicePres,
    candidate1, candidate2, candidate3, message) {
    if (!this.duration) {
      this.duration = 2000;
    }
    if (typeof digit === 'number') {
      this.counterFunc(digit, this.duration, animatedDigit, digit1, digit2, digit3, congratsMessage, winnerMsg, pres, vicePres,
        candidate1, candidate2, candidate3, message);
    }
  }

  counterFunc(endValue, durationMs, element, digit1, digit2, digit3, congratsMessage, winnerMsg, pres, vicePres,
    candidate1, candidate2, candidate3, message) {
    if (!this.steps) {
      this.steps = 3;
    }

    const stepCount = Math.abs(durationMs / this.steps);
    const valueIncrement = (endValue - 0) / stepCount;
    const sinValueIncrement = Math.PI / stepCount;

    let currentValue = 0;
    let currentSinValue = 0;

    function congratsMsg() {
      setTimeout(() => {
        if (digit1 > digit2 && digit1 > digit3) {
          congratsMessage.nativeElement.textContent = 'CONGRATULATIONS !';
          message.nativeElement.textContent = 'Ketua dan Wakil Ketua HIMA SI Periode 2020 - 2021';
          winnerMsg.nativeElement.textContent = 'PASLON ' + candidate1.choose_number;
          pres.nativeElement.textContent = candidate1.name_pres;
          vicePres.nativeElement.textContent = candidate1.name_vicepres;
        } else if (digit2 > digit1 && digit2 > digit3) {
          congratsMessage.nativeElement.textContent = 'CONGRATULATIONS !';
          message.nativeElement.textContent = 'Ketua dan Wakil Ketua HIMA SI Periode 2020 - 2021';
          winnerMsg.nativeElement.textContent = 'PASLON ' + candidate2.choose_number;
          pres.nativeElement.textContent = candidate2.name_pres;
          vicePres.nativeElement.textContent = candidate2.name_vicepres;
        } else if (digit3 > digit1 && digit3 > digit2) {
          congratsMessage.nativeElement.textContent = 'CONGRATULATIONS !';
          message.nativeElement.textContent = 'Ketua dan Wakil Ketua HIMA SI Periode 2020 - 2021';
          winnerMsg.nativeElement.textContent = 'PASLON ' + candidate3.choose_number;
          pres.nativeElement.textContent = candidate3.name_pres;
          vicePres.nativeElement.textContent = candidate3.name_vicepres;
        } else {
          congratsMessage.nativeElement.textContent = 'Draw... :(';
        }
      }, durationMs);
    }

    function step() {
      currentSinValue += sinValueIncrement;
      currentValue += valueIncrement * Math.sin(currentSinValue) ** 2 * 2;
      element.nativeElement.textContent = Math.abs(Math.floor(currentValue));
      if (currentSinValue < Math.PI) {
        window.requestAnimationFrame(step);
      } else {
        congratsMsg();
      }
    }
    step();
  }
}
