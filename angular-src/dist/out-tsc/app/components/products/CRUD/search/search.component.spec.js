/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
describe('SearchComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [SearchComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=C:/Users/Lioran/WebstormProjects/SupermarketProject/angular-src/src/app/components/products/CRUD/search/search.component.spec.js.map