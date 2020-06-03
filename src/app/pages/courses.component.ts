import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { BaseComponent, BaseDependencies } from '../base/base.component';
import { CourseNew } from '../data/course_new';

@Component({
    templateUrl: './courses.component.html',
    styleUrls: ['courses.component.scss']
})
export class CoursesComponent extends BaseComponent implements OnInit {
    public courses: CourseNew[] = [];

    constructor(dependencies: BaseDependencies, cdr: ChangeDetectorRef) {
        super(dependencies, cdr);

        super.subscribeToObservable(
            this.dependencies.languageService.langaugeChanged$.pipe(
                map((newLanguage) => {
                    this.loadCourses(newLanguage);
                })
            )
        );
    }

    ngOnInit(): void {
        this.loadCourses(this.getActiveLanguage());
    }

    private loadCourses(language: string): void {
        super.subscribeToObservable(
            this.deliveryClient
                .items<CourseNew>()
                .type('course_new')
                .languageParameter(language)
                .toObservable()
                .pipe(
                    map((response) => {
                        this.courses = response.items.filter(m => m.system.language === language);
                        super.markForCheck();
                    })
                )
        );
    }
}