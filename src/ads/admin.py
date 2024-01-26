from django.contrib import admin
from .models import Ad

class AdAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'price', 'created_at', 'owned_by')
    list_filter = ('category', 'created_at')
    search_fields = ('title', 'description', 'user__username')


admin.site.register(Ad, AdAdmin)
