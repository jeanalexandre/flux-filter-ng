import {Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
  MatDialogRef
} from "@angular/material";
import {Application} from "../../models/application.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'add-application-dialog',
  templateUrl: './add-application-dialog.component.html',
  styleUrls: ['./add-application-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddApplicationDialogComponent implements OnInit {

  applicationForm: FormGroup;
  technoCtrl = new FormControl();
  defaultTechnologies: string[] = ['JAVA', 'ANGULAR', 'HTML', 'CSS', 'PYTHON', 'NODE', 'JAVASCRIPT', 'RUBY', 'KOTLIN'];
  technologies: string[] = [];
  filteredTechnologies: string[] = this.defaultTechnologies;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('technoInput') technoInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddApplicationDialogComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: Application,
  ) {  }

  ngOnInit(): void {
    this.applicationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2),]],
      team: ['', [Validators.required, Validators.minLength(2),]],
      description: ['', [Validators.required, Validators.minLength(2),]],
      techno: ['', [Validators.required,]],
    });
  }

  get name() {
    return this.applicationForm.get('name');
  }

  get team() {
    return this.applicationForm.get('team');
  }

  get description() {
    return this.applicationForm.get('description');
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(new Application(this.name.value, this.technologies,
      this.team.value, this.description.value));
  }

  add(event: MatChipInputEvent): void {
    // Add technology only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our technology
      if ((value || '').trim()) {
        this.technologies.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.technoCtrl.setValue(null);
    }
  }

  remove(techno: string): void {
    const index = this.technologies.indexOf(techno);

    if (index >= 0) {
      this.technologies.splice(index, 1);
    }
    this.updateListTechno();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.technologies.push(event.option.viewValue);
    this.technoInput.nativeElement.value = '';
    this.updateListTechno();
    this.technoInput.nativeElement.blur();
    this.technoCtrl.setValue(null);
  }

  private updateListTechno(): void {
    this.filteredTechnologies = this.defaultTechnologies.filter(techno => !this.technologies.includes(techno));
  }
}
