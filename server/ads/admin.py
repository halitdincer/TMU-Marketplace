from django.contrib import admin
from .models import Ad, AdImage
from django.contrib.admin.widgets import AdminFileWidget
from django.utils.safestring import mark_safe
from django.db import models

class AdminImageWidget(AdminFileWidget):

    def render(self, name, value, attrs=None, renderer=None):
        output = []

        if value and getattr(value, "url", None):
            image_url = value.url
            file_name = str(value)

            output.append(
                f' <a href="{image_url}" target="_blank">'
                f'  <img src="{image_url}" alt="{file_name}" width="150" height="150" '
                f'style="object-fit: cover;"/> </a>')

        output.append(super(AdminFileWidget, self).render(name, value, attrs, renderer))
        return mark_safe(u''.join(output))
    
class AdImageInline(admin.TabularInline):
    model = AdImage
    extra = 1 
    fields = ['image', 'uploaded_at']
    readonly_fields = ['uploaded_at']
    formfield_overrides = {
        models.ImageField: {'widget': AdminImageWidget}
    }

class AdAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'price', 'created_at', 'owned_by')
    list_filter = ('category', 'created_at')
    search_fields = ('title', 'description', 'user__username')
    inlines = [AdImageInline]


    

admin.site.register(Ad, AdAdmin)
admin.site.register(AdImage)
