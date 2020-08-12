import { Component, Input } from "@angular/core";
import { LoaderService } from "./loader.service";
import { Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.scss"]
})
export class LoaderComponent {
  @Input() parent: string = 'default';
  show: boolean;
  private readonly destroyed$ = new Subject();

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.loaderService.loadState
      .pipe(takeUntil(this.destroyed$))
      .subscribe(res => {
        if(this.parent === 'default') this.show = res;
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
