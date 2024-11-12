from django.db import models
from reportgen.models import region1, reports
from rest_framework import serializers

class reportserializer(serializers.ModelSerializer):
    class Meta:
       model = reports
       fields = ("reportid","reportname","base_year","industry","endyear","geography","market","year","ASP","toc","tocprocessed","value","volume","valueunit","volumeunit","creator","reportloc","regiondet","region","tablesplit","excelreport","reportFlag")


# class indireportserializer(serializers.ModelSerializer):
#     class Meta:
#        model = reports
#        fields = ("reportid","reportname","base_year","industry","endyear","geography","market","year","ASP","toc","tocprocessed","value","volume","valueunit","volumeunit","creator","reportloc","regiondet","region","tablesplit")


class regionserializer(serializers.ModelSerializer):
    class Meta:
       model = region1
       fields=("id","region","country")


# class countryserializer(serializers.ModelSerializer):
#     class Meta:
#        model = country
#        fields=("country","value","label")


class allreposerializer(serializers.ModelSerializer):
    class Meta:
       model = reports
       fields=("reportid","reportname","geography","base_year","endyear","creator","regiondet","reportloc","createddate","excelreport","reportFlag")

class report_edit(serializers.ModelSerializer):
    class Meta:
       model = reports
       fields=("reportid","reportname","tocprocessed","valueunit","volumeunit")
